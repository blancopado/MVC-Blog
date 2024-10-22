import Post from "./Post";

class Blog {

  constructor(private posts: Post[] = []) { }

  static fromPrimitives(primitives: ReturnType<typeof Post.prototype.toPrimitives>[]) {
    return new Blog(primitives.map(Post.fromPrimitives));
  }

  post(post: Post) {
    this.posts.push(post);
  }

  getNewerPosts(author: string): Post[] {
    return this.posts
      .filter(post => post.author === author)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  delete(id: string) {
    this.posts = this.posts.filter(post => post.id !== id);
  }

  get size() {
    return this.posts.length;
  }

  getPosts() {
    return this.posts;
  }

  toPrimitives() {
    const primitives = this.posts.map(post => post.toPrimitives());
    return primitives;
  }

}

export default Blog;