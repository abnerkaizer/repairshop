import { createSafeActionClient } from "next-safe-action"
import { z } from "zod"
import * as Sentry from "@sentry/nextjs"

export const actionClient = createSafeActionClient({
    defineMetadataSchema(){
        return z.object({
            actionName: z.string(),
        })
    },
    handleServerError(e, utils){
        const { clientInput, metadata } = utils
        Sentry.captureException(e, (scope) => {
            scope.clear()
            scope.setContext('serverError', { message: e.message})
            scope.setContext('metadate', { actionName: metadata?.actionName})
            scope.setContext('clientInput', { clientInput })
            return scope
        })
        if (e.constructor.name === 'DatabaseError') {
            return "Database Error: Your data did not dave. Support will be notified."
        }
        return e.message
    }
})