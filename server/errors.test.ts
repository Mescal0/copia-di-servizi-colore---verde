import { describe, expect, it } from "vitest";
import { HttpError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError } from "@shared/_core/errors";

describe("HttpError", () => {
  it("is an instance of Error", () => {
    const err = new HttpError(500, "Internal error");
    expect(err).toBeInstanceOf(Error);
  });

  it("has name set to 'HttpError'", () => {
    const err = new HttpError(400, "Bad input");
    expect(err.name).toBe("HttpError");
  });

  it("stores the provided status code", () => {
    const err = new HttpError(404, "Not found");
    expect(err.statusCode).toBe(404);
  });

  it("stores the provided message", () => {
    const err = new HttpError(403, "Forbidden");
    expect(err.message).toBe("Forbidden");
  });
});

describe("BadRequestError", () => {
  it("creates an HttpError with status 400", () => {
    const err = BadRequestError("invalid input");
    expect(err).toBeInstanceOf(HttpError);
    expect(err.statusCode).toBe(400);
    expect(err.message).toBe("invalid input");
  });
});

describe("UnauthorizedError", () => {
  it("creates an HttpError with status 401", () => {
    const err = UnauthorizedError("not logged in");
    expect(err).toBeInstanceOf(HttpError);
    expect(err.statusCode).toBe(401);
    expect(err.message).toBe("not logged in");
  });
});

describe("ForbiddenError", () => {
  it("creates an HttpError with status 403", () => {
    const err = ForbiddenError("access denied");
    expect(err).toBeInstanceOf(HttpError);
    expect(err.statusCode).toBe(403);
    expect(err.message).toBe("access denied");
  });
});

describe("NotFoundError", () => {
  it("creates an HttpError with status 404", () => {
    const err = NotFoundError("resource missing");
    expect(err).toBeInstanceOf(HttpError);
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe("resource missing");
  });
});
