import conf from "../conf/conf";

import {Client  , ID,  Databases , Storage , Query} from "appwrite";

export class Service{
    client = new Client() ;
    databases ;
    bucket ; 

    constructor(){
        
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client) ;
        this.bucket = new Storage(this.client) ;
    }

    async createPost ({tittle , slug , content , featuredImage , status , userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionIdId , 
                slug , 
                {
                    tittle ,  
                    content , 
                    featuredImage ,
                    status,
                    userId,

                } 

            )
            
        } catch (error) {
            console.log("Appwrite service :: createPost :: error" , error);
        }

    }

    async updatePost (slug ,{tittle ,  content , featuredImage , status }){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionIdId , 
                slug , 
                {
                    tittle ,  
                    content , 
                    featuredImage ,
                    status
                    } 

            )
        } catch (error) {
            console.log("Appwrite service :: UpdatePost :: error" , error);
            
        }

    }

    async deletePost(slug){
        try {

            await this.databases.deleteDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionIdId , 
                slug 
            )
            return true 
            
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error" , error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId ,
                conf.appwriteCollectionIdId , 
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPost :: error" , error);
            
        }

    }

    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdId,
                queries,

            )
            
        } catch (error) {
            console.log("Appwrite service :: getPostActive :: error" , error);
            
        }
    }

    //file uploading services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId ,
                ID.unique() , 
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error" , error);
            return false
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId , 
                fileId
            )
            return true

        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error" , error);
            return false
            
        }
    }

    async filePreview(fileId) {
        try {
            const previewURL = await this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
            console.log('Generated Preview URL:', previewURL.href);
            return previewURL;
        } catch (error) {
            console.log("Appwrite service :: filePreview :: error", error);
        }
    }
    

}

const service = new Service()

export default service