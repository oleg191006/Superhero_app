import { isAxiosError } from "axios";
import { baseService } from "./base-service";
import { ResponseError } from "../exeptions";
import type { HttpMethod } from "../types/services/services.types";
import { axiosClient } from "../plugins/axiosClient";

jest.mock("../plugins/axiosClient", () => ({
  axiosClient: {
    request: jest.fn(),
  },
}));

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  isAxiosError: jest.fn(),
}));

const mockedAxiosRequest = axiosClient.request as jest.Mock;

describe("baseService", () => {
  beforeEach(() => {
    mockedAxiosRequest.mockClear();
    (isAxiosError as unknown as jest.Mock).mockClear();
  });

  describe("request", () => {
    it("should return data on a successful request", async () => {
      const mockResponse = { data: { success: true, message: "OK" } };
      mockedAxiosRequest.mockResolvedValue(mockResponse);

      const mockedIsAxiosError = isAxiosError as unknown as jest.Mock;
      mockedIsAxiosError.mockReturnValue(false);

      const params = {
        url: "/test",
        method: "GET" as HttpMethod,
      };

      const result = await baseService.request(params);

      expect(mockedAxiosRequest).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockResponse.data);
    });

    it("should throw a ResponseError for a known server error", async () => {
      const mockErrorResponse = {
        response: {
          data: {
            code: "VALIDATION_ERROR",
            message: "Invalid input",
          },
        },
      };

      mockedAxiosRequest.mockRejectedValue(mockErrorResponse);
      const mockedIsAxiosError = isAxiosError as unknown as jest.Mock;
      mockedIsAxiosError.mockReturnValue(true);

      const params = {
        url: "/test",
        method: "POST" as HttpMethod,
        data: { name: "invalid" },
      };

      await expect(baseService.request(params)).rejects.toThrow(ResponseError);
      await expect(baseService.request(params)).rejects.toThrow(
        new ResponseError(mockErrorResponse.response.data)
      );
    });

    it("should throw a ResponseError for an unknown error", async () => {
      mockedAxiosRequest.mockRejectedValue(new Error("Network error"));
      const mockedIsAxiosError = isAxiosError as unknown as jest.Mock;
      mockedIsAxiosError.mockReturnValue(false);

      const params = {
        url: "/test",
        method: "GET" as HttpMethod,
      };

      await expect(baseService.request(params)).rejects.toThrow(ResponseError);
      await expect(baseService.request(params)).rejects.toThrow(
        new ResponseError({
          code: "UNKNOWN_ERROR",
          message: "UNKNOWN_ERROR_MESSAGE",
        })
      );
    });
  });
});
