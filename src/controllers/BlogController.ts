import BlogDAO from "../models/dao/BlogDAO";
import PostController from "./PostController";
import ReadController from "./ReadController";
import DeleteController from "./DeleteController";

class BlogController {

  private readonly postController: PostController;
  private readonly readController: ReadController;
  private readonly deleteController: DeleteController;

  constructor(dao: BlogDAO) {
    this.postController = new PostController(dao);
    this.readController = new ReadController(dao);
    this.deleteController = new DeleteController(dao);
  }

  async post(author: string, content: string) {
    await this.postController.post(author, content);
  }

  async read(author: string) {
    return this.readController.read(author);
  }

  async delete(id: string) {
    return this.deleteController.delete(id);
  }
}

export default BlogController;
