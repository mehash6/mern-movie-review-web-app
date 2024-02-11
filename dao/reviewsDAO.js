import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;
export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("reviews");
      console.log("connected to review collection");
    } catch (e) {
      console.error("Unable to establish connection handle in reviewDAO: ${e}");
    }
  }

  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        review: review,
        movie_id: new ObjectId(movieId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error("unable to post review: " + e);
      return { error: e };
    }
  }
  static async updateReview(reviewId, name, userId, review, date) {
    try {
      const updateResponse = await reviews.updateOne(
        {
          _id: new ObjectId(reviewId),
          name: name,
          user_id: userId,
          //movie_id: new ObjectId(movieId),
        },
        { $set: { review: review, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error("unable to update review: " + e);
      return { error: e };
    }
  }
  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error("unable to update review: " + e);
      return { error: e };
    }
  }
}
