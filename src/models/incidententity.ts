/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import {
  ConversationsAPIEntitiesReference,
  ConversationsAPIEntitiesReference$zodSchema,
} from "./conversationsapientitiesreference.js";
import {
  CustomFieldsFieldValue,
  CustomFieldsFieldValue$zodSchema,
} from "./customfieldsfieldvalue.js";
import {
  IncidentEntityFieldRequirementEntity,
  IncidentEntityFieldRequirementEntity$zodSchema,
} from "./incidententityfieldrequiremententity.js";
import {
  IncidentsChannelEntity,
  IncidentsChannelEntity$zodSchema,
} from "./incidentschannelentity.js";
import {
  IncidentsConferenceBridgeEntity,
  IncidentsConferenceBridgeEntity$zodSchema,
} from "./incidentsconferencebridgeentity.js";
import {
  IncidentsImpactEntity,
  IncidentsImpactEntity$zodSchema,
} from "./incidentsimpactentity.js";
import {
  IncidentsLifecycleMeasurementEntity,
  IncidentsLifecycleMeasurementEntity$zodSchema,
} from "./incidentslifecyclemeasuremententity.js";
import {
  IncidentsLifecyclePhaseEntity,
  IncidentsLifecyclePhaseEntity$zodSchema,
} from "./incidentslifecyclephaseentity.js";
import {
  IncidentsMilestoneEntity,
  IncidentsMilestoneEntity$zodSchema,
} from "./incidentsmilestoneentity.js";
import {
  IncidentsRoleAssignmentEntity,
  IncidentsRoleAssignmentEntity$zodSchema,
} from "./incidentsroleassignmententity.js";
import {
  IncidentsStatusPageEntity,
  IncidentsStatusPageEntity$zodSchema,
} from "./incidentsstatuspageentity.js";
import {
  IncidentsTeamAssignmentEntityLite,
  IncidentsTeamAssignmentEntityLite$zodSchema,
} from "./incidentsteamassignmententitylite.js";
import {
  NullableAuthorEntity,
  NullableAuthorEntity$zodSchema,
} from "./nullableauthorentity.js";
import {
  NullableEventNoteEntity,
  NullableEventNoteEntity$zodSchema,
} from "./nullableeventnoteentity.js";
import {
  NullableIncidentsContextObjectEntity,
  NullableIncidentsContextObjectEntity$zodSchema,
} from "./nullableincidentscontextobjectentity.js";
import {
  NullableOrganizationEntity,
  NullableOrganizationEntity$zodSchema,
} from "./nullableorganizationentity.js";
import {
  NullableSeverityMatrixConditionEntity,
  NullableSeverityMatrixConditionEntity$zodSchema,
} from "./nullableseveritymatrixconditionentity.js";
import {
  NullableSeverityMatrixImpactEntity,
  NullableSeverityMatrixImpactEntity$zodSchema,
} from "./nullableseveritymatriximpactentity.js";
import {
  NullableSuccinctEntity,
  NullableSuccinctEntity$zodSchema,
} from "./nullablesuccinctentity.js";
import {
  NullableTicketingTicketEntity,
  NullableTicketingTicketEntity$zodSchema,
} from "./nullableticketingticketentity.js";
import { SuccinctEntity, SuccinctEntity$zodSchema } from "./succinctentity.js";
import {
  TicketingTicketEntity,
  TicketingTicketEntity$zodSchema,
} from "./ticketingticketentity.js";

/**
 * A key/value of labels
 */
export type IncidentEntityLabels = {};

export const IncidentEntityLabels$zodSchema: z.ZodType<
  IncidentEntityLabels,
  z.ZodTypeDef,
  unknown
> = z.object({}).describe("A key/value of labels");

export type RetroExport = {};

export const RetroExport$zodSchema: z.ZodType<
  RetroExport,
  z.ZodTypeDef,
  unknown
> = z.object({});

/**
 * IncidentEntity model
 */
export type IncidentEntity = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  created_at?: string | null | undefined;
  started_at?: string | null | undefined;
  discarded_at?: string | null | undefined;
  summary?: string | null | undefined;
  customer_impact_summary?: string | null | undefined;
  description?: string | null | undefined;
  current_milestone?: string | null | undefined;
  number?: number | null | undefined;
  priority?: string | null | undefined;
  severity?: string | null | undefined;
  severity_color?: string | null | undefined;
  severity_impact?: string | null | undefined;
  severity_condition?: string | null | undefined;
  tag_list?: Array<string> | null | undefined;
  incident_type?: NullableSuccinctEntity | null | undefined;
  severity_impact_object?:
    | NullableSeverityMatrixImpactEntity
    | null
    | undefined;
  severity_condition_object?:
    | NullableSeverityMatrixConditionEntity
    | null
    | undefined;
  private_id?: string | null | undefined;
  organization_id?: string | null | undefined;
  milestones?: Array<IncidentsMilestoneEntity> | null | undefined;
  lifecycle_phases?: Array<IncidentsLifecyclePhaseEntity> | null | undefined;
  lifecycle_measurements?:
    | Array<IncidentsLifecycleMeasurementEntity>
    | null
    | undefined;
  active?: boolean | null | undefined;
  labels?: IncidentEntityLabels | null | undefined;
  role_assignments?: Array<IncidentsRoleAssignmentEntity> | null | undefined;
  status_pages?: Array<IncidentsStatusPageEntity> | null | undefined;
  incident_url?: string | null | undefined;
  private_status_page_url?: string | null | undefined;
  organization?: NullableOrganizationEntity | null | undefined;
  customers_impacted?: number | null | undefined;
  monetary_impact?: number | null | undefined;
  monetary_impact_cents?: number | null | undefined;
  last_update?: string | null | undefined;
  last_note?: NullableEventNoteEntity | null | undefined;
  report_id?: string | null | undefined;
  ai_incident_summary?: string | null | undefined;
  services?: Array<SuccinctEntity> | null | undefined;
  environments?: Array<SuccinctEntity> | null | undefined;
  functionalities?: Array<SuccinctEntity> | null | undefined;
  channel_name?: string | null | undefined;
  channel_reference?: string | null | undefined;
  channel_id?: string | null | undefined;
  channel_status?: string | null | undefined;
  incident_tickets?: Array<TicketingTicketEntity> | null | undefined;
  ticket?: NullableTicketingTicketEntity | null | undefined;
  impacts?: Array<IncidentsImpactEntity> | null | undefined;
  conference_bridges?:
    | Array<IncidentsConferenceBridgeEntity>
    | null
    | undefined;
  incident_channels?: Array<IncidentsChannelEntity> | null | undefined;
  retro_exports?: Array<RetroExport> | null | undefined;
  created_by?: NullableAuthorEntity | null | undefined;
  context_object?: NullableIncidentsContextObjectEntity | null | undefined;
  team_assignments?:
    | Array<IncidentsTeamAssignmentEntityLite>
    | null
    | undefined;
  conversations?: Array<ConversationsAPIEntitiesReference> | null | undefined;
  custom_fields?: Array<CustomFieldsFieldValue> | null | undefined;
  field_requirements?:
    | Array<IncidentEntityFieldRequirementEntity>
    | null
    | undefined;
};

export const IncidentEntity$zodSchema: z.ZodType<
  IncidentEntity,
  z.ZodTypeDef,
  unknown
> = z.object({
  active: z.boolean().nullable().optional(),
  ai_incident_summary: z.string().nullable().optional(),
  channel_id: z.string().nullable().optional(),
  channel_name: z.string().nullable().optional(),
  channel_reference: z.string().nullable().optional(),
  channel_status: z.string().nullable().optional(),
  conference_bridges: z.array(IncidentsConferenceBridgeEntity$zodSchema)
    .nullable().optional(),
  context_object: NullableIncidentsContextObjectEntity$zodSchema.nullable()
    .optional(),
  conversations: z.array(ConversationsAPIEntitiesReference$zodSchema).nullable()
    .optional(),
  created_at: z.string().datetime({ offset: true }).nullable().optional(),
  created_by: NullableAuthorEntity$zodSchema.nullable().optional(),
  current_milestone: z.string().nullable().optional(),
  custom_fields: z.array(CustomFieldsFieldValue$zodSchema).nullable()
    .optional(),
  customer_impact_summary: z.string().nullable().optional(),
  customers_impacted: z.number().int().nullable().optional(),
  description: z.string().nullable().optional(),
  discarded_at: z.string().datetime({ offset: true }).nullable().optional(),
  environments: z.array(SuccinctEntity$zodSchema).nullable().optional(),
  field_requirements: z.array(IncidentEntityFieldRequirementEntity$zodSchema)
    .nullable().optional(),
  functionalities: z.array(SuccinctEntity$zodSchema).nullable().optional(),
  id: z.string().nullable().optional(),
  impacts: z.array(IncidentsImpactEntity$zodSchema).nullable().optional(),
  incident_channels: z.array(IncidentsChannelEntity$zodSchema).nullable()
    .optional(),
  incident_tickets: z.array(TicketingTicketEntity$zodSchema).nullable()
    .optional(),
  incident_type: NullableSuccinctEntity$zodSchema.nullable().optional(),
  incident_url: z.string().nullable().optional(),
  labels: z.lazy(() => IncidentEntityLabels$zodSchema).nullable().optional(),
  last_note: NullableEventNoteEntity$zodSchema.nullable().optional(),
  last_update: z.string().nullable().optional(),
  lifecycle_measurements: z.array(IncidentsLifecycleMeasurementEntity$zodSchema)
    .nullable().optional(),
  lifecycle_phases: z.array(IncidentsLifecyclePhaseEntity$zodSchema).nullable()
    .optional(),
  milestones: z.array(IncidentsMilestoneEntity$zodSchema).nullable().optional(),
  monetary_impact: z.number().int().nullable().optional(),
  monetary_impact_cents: z.number().int().nullable().optional(),
  name: z.string().nullable().optional(),
  number: z.number().int().nullable().optional(),
  organization: NullableOrganizationEntity$zodSchema.nullable().optional(),
  organization_id: z.string().nullable().optional(),
  priority: z.string().nullable().optional(),
  private_id: z.string().nullable().optional(),
  private_status_page_url: z.string().nullable().optional(),
  report_id: z.string().nullable().optional(),
  retro_exports: z.array(z.lazy(() => RetroExport$zodSchema)).nullable()
    .optional(),
  role_assignments: z.array(IncidentsRoleAssignmentEntity$zodSchema).nullable()
    .optional(),
  services: z.array(SuccinctEntity$zodSchema).nullable().optional(),
  severity: z.string().nullable().optional(),
  severity_color: z.string().nullable().optional(),
  severity_condition: z.string().nullable().optional(),
  severity_condition_object: NullableSeverityMatrixConditionEntity$zodSchema
    .nullable().optional(),
  severity_impact: z.string().nullable().optional(),
  severity_impact_object: NullableSeverityMatrixImpactEntity$zodSchema
    .nullable().optional(),
  started_at: z.string().datetime({ offset: true }).nullable().optional(),
  status_pages: z.array(IncidentsStatusPageEntity$zodSchema).nullable()
    .optional(),
  summary: z.string().nullable().optional(),
  tag_list: z.array(z.string()).nullable().optional(),
  team_assignments: z.array(IncidentsTeamAssignmentEntityLite$zodSchema)
    .nullable().optional(),
  ticket: NullableTicketingTicketEntity$zodSchema.nullable().optional(),
}).describe("IncidentEntity model");
