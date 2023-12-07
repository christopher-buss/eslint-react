import { isChildrenToArray } from "@eslint-react/core";
import { getPragmaFromContext } from "@eslint-react/jsx";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-to-array";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow `Children.toArray()`",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_CHILDREN_TO_ARRAY: "Using `Children` is uncommon and can lead to fragile code. Use alternatives instead.",
    },
  },
  defaultOptions: [],
  create(context) {
    const pragma = getPragmaFromContext(context);

    return {
      MemberExpression(node) {
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        if (isChildrenToArray(node, context, initialScope, pragma)) {
          context.report({
            messageId: "NO_CHILDREN_TO_ARRAY",
            node: node.property,
          });
        }
      },
    };
  },
});
