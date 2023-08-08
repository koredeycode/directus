import type { AbstractQueryNode } from '../../../abstract-query.js';
import type { ConditionGeoIntersectsNode } from './geo-intersects.js';
import type { ConditionGeoIntersectsBBoxNode } from './geo-intersects-bbox.js';
import type { ConditionFieldNode } from './field-condition.js';
import type { ConditionNumberNode } from './number-condition.js';
import type { ConditionSetNode } from './set-condition.js';
import type { ConditionStringNode } from './string-condition.js';
/**
 * Used to specify a condition on a query.
 * Note: No explicit support to check for 'empty' (it's just an empty string) and null.
 *
 * @example
 * ```
 * {
 * 		type: 'condition',
 * 		condition: {...}
 * },
 * ```
 */
export interface AbstractQueryConditionNode extends AbstractQueryNode {
	type: 'condition';
	condition: ActualConditionNodes;
}

/**
 * Possible nodes which specify the condition.
 *
 * @todo The API should make sure, that the type of the targeting column has the correct type,
 * so that f.e. a condition-string will only be applied to a column of type string.
 */
export type ActualConditionNodes =
	| ConditionStringNode
	| ConditionNumberNode
	| ConditionGeoIntersectsNode
	| ConditionGeoIntersectsBBoxNode
	| ConditionSetNode
	| ConditionFieldNode;