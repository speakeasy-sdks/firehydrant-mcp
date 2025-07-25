/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import {
  IncidentsLifecycleMilestoneEntity,
  IncidentsLifecycleMilestoneEntity$zodSchema,
} from "./incidentslifecyclemilestoneentity.js";

export type IncidentsLifecyclePhaseEntity = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  description?: string | null | undefined;
  type?: string | null | undefined;
  position?: number | null | undefined;
  milestones?: Array<IncidentsLifecycleMilestoneEntity> | null | undefined;
};

export const IncidentsLifecyclePhaseEntity$zodSchema: z.ZodType<
  IncidentsLifecyclePhaseEntity,
  z.ZodTypeDef,
  unknown
> = z.object({
  description: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
  milestones: z.array(IncidentsLifecycleMilestoneEntity$zodSchema).nullable()
    .optional(),
  name: z.string().nullable().optional(),
  position: z.number().int().nullable().optional(),
  type: z.string().nullable().optional(),
});
