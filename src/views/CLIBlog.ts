import * as readline from "readline-sync";
import BlogController from "../controllers/BlogController";
import Post from "../models/Post";
import { View } from "./View";

export class CLIBlogView implements View {

  private readonly options: Array<(onSuccess: () => void, onError: (err: Error) => void) => void>;

  constructor(private readonly blogController: BlogController) {
    this.options = [
      this.post.bind(this),
      this.read.bind(this),
      this.delete.bind(this),
    ];
  }

  render() {
    console.log("+++++++++++++++++++++");
    console.log("Welcome to the Blog!");
    console.log("+++++++++++++++++++++", "\n");
    console.log(`Choose an option:`);
    console.log(`${this.options.map((option, index) =>
      ` ${(index + 1)}) ${option.name.replace("bound ", "")}`).join("\n")}`);

    const option = Number(readline.question("Option: "));
    this.options[option - 1](this.render.bind(this), this.onError.bind(this));
  }

  private onError(_err: Error) {
    console.log("Something failed, try again...");
  }

  private post(onSuccess: () => void, onError: (err: Error) => void) {
    const author = readline.question("Name? ");
    const content = readline.question("What are yout thinking? ");
    this.blogController.post(author, content)
      .then(() => {
        console.log("Your post was published!", "\n");
      })
      .catch(onError)
      .finally(onSuccess);
  }

  private read(onSuccess: () => void, onError: (err: Error) => void) {
    const author = readline.question("From whom? ");
    this.blogController.read(author)
      .then((posts: Post[]) => posts
        .map((post: Post) =>
          console.log(`
            id: ${post.id}
            author: ${post.author}
            date: ${post.date.toISOString()}
            content: ${post.content}
          `)
        ))
      .catch(onError)
      .finally(onSuccess);
  }

  private delete(onSuccess: () => void, onError: (err: Error) => void) {
    const id = readline.question("Select the post id to delete: ");
    this.blogController.delete(id)
      .then(() => {
        console.log("--------------------------------");
        console.log("Post deleted!");
        console.log("--------------------------------");
      })
      .catch(onError)
      .finally(onSuccess);
  }
  
}