import ReviewsDAO from "../../dao/reviewsDAO.js"

export default class ReviewsController{
    static async apiPostReviews(req,res,next){
        try{
            const movieId = parseInt(req.body.movieId);
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            );
            res.json({status:"sucess"});
        }catch(e){
            res.status(500).json({error:e.message});
        }
    }
    static async apiGetReview(req,res,next){
        try{
            let id = req.params.id || {};
            console.log(`ID: ${id}`); // Adicione esta linha para depuração
            let review = await ReviewsDAO.getReview(id);
            if(!review){
                res.status(404).json({error: "Not Found"});
            }
            res.json(review);
        }catch(e){
            console.log(`api,${e}`)
            res.status(500).json({error:e});
        }
    }
    static async apiUpdateReview(req,res,next){
        try{
            console.log(req.params.id);
            const reviewId = req.params.id;
            const review = req.body.review;
            const user = req.body.user;

            const reviewResponse = await ReviewsDAO.UpdateReview(
                reviewId,
                user,
                review
            );
            if(reviewResponse.error){
                res.status(400).json({error:reviewResponse.error});
            }
            if(reviewResponse.modifiedCount==0){
                throw new Error("Unable to upadte review");
            }
            res.json({status:"sucess"})
        }catch(e){
            res.status(500).json({error:e.message});
        }
    }
    static async apiDeleteReview(req,res,next){
        try{
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
            res.json({status:"sucess"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async apiGetReviews(req,res,next){
        try{
            let id=req.params.id || {}
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);
            if(!reviews){
                res.status(404).json({error:"Not Found"})
                return
            }
            res.json(reviews)
        }catch(e){
            console.log(`api, ${e})}`)
            res.status(500).json({error: e})
        }
    }
}