// interface Handler<Request = string, Result = string> {
//   setNext(handler: Handler<Request, Result>): Handler<Request, Result>
//   handle(request: Request): Result
// }

// abstract class AbstractHandler implements Handler {
//   private nextHandler: Handler

//   public setNext(handler: Handler): Handler {
//     this.nextHandler = handler
//     // Returning a handler from here will let us link handlers in a
//     // convenient way like this:
//     // monkey.setNext(squirrel).setNext(dog);
//     return handler
//   }

//   public handle(request: string): string {
//     if (this.nextHandler) {
//       return this.nextHandler.handle(request)
//     }

//     return null
//   }
// }
