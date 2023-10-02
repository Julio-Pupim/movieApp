import { ObjectId } from 'mongodb';


let reviews 

export default class ReviewsDAO{
    
    static async injectDB(conn){
        if(!!reviews){
            return
        }
        try{
            reviews = await conn.db("reviews").collection("reviews");
        }catch(e){  
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
            
        }
    }
    static async addReview (movieId, user, review){
        
        try{
            const reviewDoc = {
                movieId: movieId,
                user : user,
                review : review,
            }
            return await reviews.insertOne(reviewDoc);
        }catch(e){
            console.error(`Unable to post review,${e}`);
            return {error: e }
        }
    }
    static async getReview(reviewId){
        try{
            return await reviews.findOne({ _id: reviewId })
        }catch(e){
            console.error(`Unable to get the review: ${e}`);
            return {error: e}
        }
    }
    static async UpdateReview(reviewId,user,review){
        try{
            const updateResponse = await reviews.updateOne(
                {_id: reviewId},
                {$set:{user:user,review:review }}
            )
            return updateResponse;
        }catch(e){
            console.error(`Unable to update the review: ${e}`);
            return {error: e}
        }
    }
    static async deleteReview(reviewId){
        try {
            console.log(`Tentando excluir review com _id: ${reviewId}`);
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId)
            });
            console.log(`Resposta da exclusão: ${JSON.stringify(deleteResponse)}`);
            return deleteResponse;
        } catch(e){
            console.error(`Unable to delete the review: ${e}`);
            return {error: e};
        }
    }
    static async getReviewsByMovieId(movieId){
        try{
            const cursor = await reviews.find({movieId: parseInt(movieId)})
            return cursor.toArray()
        }catch(e){
            console.error(`Unable to get the review: ${e}`);
            return {error: e}
        }
    }
}