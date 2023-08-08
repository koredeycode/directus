import type { AbstractSqlQueryNode } from '../../abstract-sql-query.js';
import type { AbstractSqlQueryConditionNode } from './conditions/condition.js';

/**
 * A wrapper for logical conditions like AND, OR, NOT.
 */
export interface AbstractSqlQueryLogicalNode extends AbstractSqlQueryNode {
	type: 'logical';
	operator: 'and' | 'or';
	negate: boolean;
	childNodes: (AbstractSqlQueryConditionNode | AbstractSqlQueryLogicalNode)[];
}