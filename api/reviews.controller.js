import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = req.body.movie_id;
      const review = req.body.review;
      const userInfo = {
        _id: req.body.user_id,
        name: req.body.name,
      };
      const date = new Date();
      const ReviewResponse = await ReviewsDAO.addReview(
        movieId,
        userInfo,
        review,
        date
      );
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const userName = req.body.name;
      const date = new Date();
      const ReviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        userName,
        req.body.user_id,
        review,
        date
        //req.body.movie_id
      );
      console.log(
        "review update request has been sent as " +
          JSON.stringify(ReviewResponse)
      );
      var { error } = ReviewResponse;
      if (error) {
        res.status.json({ error });
      }
      if (ReviewResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update review User may not be original poster"
        );
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const ReviewResponse = await ReviewsDAO.deleteReview(reviewId, userId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
