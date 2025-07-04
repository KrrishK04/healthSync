"use server"
import { BUCKET_ID, storage, users, databases, DATABASE_ID, PATIENT_COLLECTION_ID, ENDPOINT, PROJECT_ID } from "../appwrite.config";
import {Query, ID} from "node-appwrite"
import { parseStringify } from "../utils";
import {InputFile} from "node-appwrite/file";


export async function createUser(user: CreateUserParams) {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        return { user: parseStringify(newUser), isNew: true };
    } catch (error: any) {
        if (error && error?.code === 409) {
            const documents = await users.list([Query.equal("email", [user.email])]);
            return { user: documents?.users[0], isNew: false };
        }
        console.error("An error occurred while creating a new user:", error);
    }
}

 

export const getUser = async (userId: string) => {
    try{
        const user = await users.get(userId);
        return parseStringify(user)
    } catch(error: any){
        console.log(error);
    }
};


export const registerPatient = async({identificationDocument, ...patient}: RegisterUserParams ) => {
    try{
        let file;
        if(identificationDocument){
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('name') as string
            );
            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }
        const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
            identificationDocumentId: file?.$id || null,
            identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
            ...patient
        } 
    )

    return parseStringify(newPatient);

    } catch(error: any){
        console.error("An error occurred while registering the patient:", error);
    }
} 

export const getPatient = async(userId: string) => {
    try{
        const patient = await databases.listDocuments(DATABASE_ID!, PATIENT_COLLECTION_ID!,[
            Query.equal("userId", userId)
        ]);
        return parseStringify(patient.documents[0]);    
    }catch(error: any){
        console.error("An error occurred while fetching the patient:", error);
    }
}