/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";

export type NullablePaginationEntity = {
  count?: number | null | undefined;
  page?: number | null | undefined;
  items?: number | null | undefined;
  pages?: number | null | undefined;
  last?: number | null | undefined;
  prev?: number | null | undefined;
  next?: number | null | undefined;
};

export const NullablePaginationEntity$zodSchema: z.ZodType<
  NullablePaginationEntity,
  z.ZodTypeDef,
  unknown
> = z.object({
  count: z.number().int().nullable().optional(),
  items: z.number().int().nullable().optional(),
  last: z.number().int().nullable().optional(),
  next: z.number().int().nullable().optional(),
  page: z.number().int().nullable().optional(),
  pages: z.number().int().nullable().optional(),
  prev: z.number().int().nullable().optional(),
});
