import BlogDAO from "../models/dao/BlogDAO";

class DeleteController {

  constructor(private readonly dao: BlogDAO) { }

  async delete(id: string) {
    const blog = await this.dao.get();
    blog.delete(id);
    await this.dao.delete(id);
  }
  
}

export default DeleteController;
