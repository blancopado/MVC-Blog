import BlogDAO from "../models/dao/BlogDAO";

class ReadController {

  constructor(private readonly dao: BlogDAO) { }

  async read(author: string) {
    const blog = await this.dao.get();
    return blog.getNewerPosts(author);
  }
  
}

export default ReadController;
