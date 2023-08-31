import { expect, test } from 'vitest';
import { randomIdentifier } from '@directus/random';
import type { AbstractQueryFieldNodeRelatedManyToOne } from '@directus/data';
import { createJoin } from './create-join.js';
import type { AbstractSqlQueryJoinNode } from '../../types/nodes/join.js';

test('Convert m2o relation on single field ', () => {
	const randomCurrentCollection = randomIdentifier();
	const randomCurrentField = randomIdentifier();

	const randomExternalCollection = randomIdentifier();
	const randomExternalStore = randomIdentifier();
	const randomExternalField = randomIdentifier();
	const randomExternalSelectField = randomIdentifier();
	const randomAlias = randomIdentifier();

	const node: AbstractQueryFieldNodeRelatedManyToOne = {
		type: 'm2o',
		join: {
			current: {
				fields: [randomCurrentField],
			},
			external: {
				store: randomExternalStore,
				collection: randomExternalCollection,
				fields: [randomExternalField],
			},
		},
		nodes: [
			{
				type: 'primitive',
				field: randomExternalSelectField,
			},
		],
		alias: randomAlias,
	};

	const expected: AbstractSqlQueryJoinNode = {
		type: 'join',
		table: randomExternalCollection,
		on: {
			type: 'condition',
			condition: {
				type: 'condition-field',
				target: {
					type: 'primitive',
					table: randomCurrentCollection,
					column: randomCurrentField,
				},
				operation: 'eq',
				compareTo: {
					type: 'primitive',
					table: randomAlias,
					column: randomExternalField,
				},
			},
			negate: false,
		},
		as: randomAlias,
	};

	expect(createJoin(randomCurrentCollection, node, randomAlias)).toStrictEqual(expected);
});

test('Convert m2o relation with composite keys', () => {
	const randomCurrentCollection = randomIdentifier();
	const randomCurrentField = randomIdentifier();
	const randomCurrentField2 = randomIdentifier();

	const randomExternalCollection = randomIdentifier();
	const randomExternalStore = randomIdentifier();
	const randomExternalField = randomIdentifier();
	const randomExternalField2 = randomIdentifier();
	const randomExternalSelectField = randomIdentifier();
	const randomAlias = randomIdentifier();

	const node: AbstractQueryFieldNodeRelatedManyToOne = {
		type: 'm2o',
		join: {
			current: {
				fields: [randomCurrentField, randomCurrentField2],
			},
			external: {
				store: randomExternalStore,
				collection: randomExternalCollection,
				fields: [randomExternalField, randomExternalField2],
			},
		},
		nodes: [
			{
				type: 'primitive',
				field: randomExternalSelectField,
			},
		],
		alias: randomAlias,
	};

	const expected: AbstractSqlQueryJoinNode = {
		type: 'join',
		table: randomExternalCollection,
		on: {
			type: 'logical',
			operator: 'and',
			negate: false,
			childNodes: [
				{
					type: 'condition',
					condition: {
						type: 'condition-field',
						target: {
							type: 'primitive',
							table: randomCurrentCollection,
							column: randomCurrentField,
						},
						operation: 'eq',
						compareTo: {
							type: 'primitive',
							table: randomAlias,
							column: randomExternalField,
						},
					},
					negate: false,
				},
				{
					type: 'condition',
					condition: {
						type: 'condition-field',
						target: {
							type: 'primitive',
							table: randomCurrentCollection,
							column: randomCurrentField2,
						},
						operation: 'eq',
						compareTo: {
							type: 'primitive',
							table: randomAlias,
							column: randomExternalField2,
						},
					},
					negate: false,
				},
			],
		},
		as: randomAlias,
	};

	expect(createJoin(randomCurrentCollection, node, randomAlias)).toStrictEqual(expected);
});