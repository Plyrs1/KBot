module.exports = {
	root: true,
	extends: [
		'plugin:@typescript-eslint/recommended', //
		'plugin:@typescript-eslint/strict',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'turbo'
	],
	plugins: [
		'@typescript-eslint', //
		'import',
		'eslint-plugin-tsdoc'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		warnOnUnsupportedTypeScriptVersion: false,
		emitDecoratorMetadata: true
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.d.ts']
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: 'src/tsconfig.json'
			}
		}
	},
	rules: {
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/array-type': 'off',
		'@typescript-eslint/await-thenable': 'error',
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': 'allow-with-description',
				'ts-ignore': 'allow-with-description'
			}
		],
		'@typescript-eslint/ban-types': 'error',
		'@typescript-eslint/class-literal-property-style': 'error',
		'@typescript-eslint/consistent-generic-constructors': 'off',
		'@typescript-eslint/consistent-indexed-object-style': 'error',
		'@typescript-eslint/consistent-type-assertions': 'error',
		'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
				fixStyle: 'separate-type-imports'
			}
		],
		'@typescript-eslint/default-param-last': 'error',
		'@typescript-eslint/dot-notation': [
			'error',
			{
				allowKeywords: true,
				allowPattern: '(^[A-Z])|(^[a-z]+(_[a-z]+)+$)',
				allowPrivateClassPropertyAccess: true
			}
		],
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-member-accessibility': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'@typescript-eslint/init-declarations': 'off',
		'@typescript-eslint/member-delimiter-style': 'off',
		'@typescript-eslint/member-ordering': [
			'error',
			{
				default: [
					'signature',
					'public-instance-field',
					'protected-instance-field',
					'private-instance-field',
					'instance-field',
					'public-constructor',
					'protected-constructor',
					'private-constructor',
					'constructor',
					'public-instance-method',
					'protected-instance-method',
					'private-instance-method',
					'instance-method',
					'public-static-field',
					'protected-static-field',
					'private-static-field',
					'static-field',
					'public-static-method',
					'protected-static-method',
					'private-static-method',
					'static-method'
				]
			}
		],
		'@typescript-eslint/method-signature-style': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/no-base-to-string': 'error',
		'@typescript-eslint/no-confusing-non-null-assertion': 'error',
		'@typescript-eslint/no-confusing-void-expression': 'error',
		'@typescript-eslint/no-duplicate-enum-values': 'error',
		'@typescript-eslint/no-duplicate-type-constituents': 'error',
		'@typescript-eslint/no-dynamic-delete': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-extra-non-null-assertion': 'error',
		'@typescript-eslint/no-extraneous-class': 'error',
		'@typescript-eslint/no-floating-promises': 'error',
		'@typescript-eslint/no-for-in-array': 'error',
		'@typescript-eslint/no-import-type-side-effects': 'error',
		'@typescript-eslint/no-inferrable-types': 'error',
		'@typescript-eslint/no-invalid-void-type': 'error',
		'@typescript-eslint/no-meaningless-void-operator': 'error',
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: false
			}
		],
		'@typescript-eslint/no-mixed-enums': 'error',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-redundant-type-constituents': 'off',
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/no-this-alias': 'error',
		'@typescript-eslint/no-type-alias': 'off',
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
		'@typescript-eslint/no-unnecessary-condition': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-unnecessary-type-arguments': 'error',
		'@typescript-eslint/no-unnecessary-type-assertion': 'off',
		'@typescript-eslint/no-unnecessary-type-constraint': 'error',
		'@typescript-eslint/no-unsafe-argument': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-declaration-merging': 'error',
		'@typescript-eslint/no-unsafe-enum-comparison': 'error',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-useless-empty-export': 'error',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/non-nullable-type-assertion-style': 'error',
		'@typescript-eslint/parameter-properties': 'off',
		'@typescript-eslint/prefer-as-const': 'error',
		'@typescript-eslint/prefer-enum-initializers': 'off',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-includes': 'error',
		'@typescript-eslint/prefer-literal-enum-member': 'error',
		'@typescript-eslint/prefer-namespace-keyword': 'error',
		'@typescript-eslint/prefer-nullish-coalescing': 'error',
		'@typescript-eslint/prefer-optional-chain': 'error',
		'@typescript-eslint/prefer-readonly': 'error',
		'@typescript-eslint/prefer-readonly-parameter-types': 'off',
		'@typescript-eslint/prefer-reduce-type-parameter': 'error',
		'@typescript-eslint/prefer-regexp-exec': 'off',
		'@typescript-eslint/prefer-return-this-type': 'error',
		'@typescript-eslint/prefer-string-starts-ends-with': 'error',
		'@typescript-eslint/prefer-ts-expect-error': 'error',
		'@typescript-eslint/promise-function-async': 'error',
		'@typescript-eslint/require-array-sort-compare': 'error',
		'@typescript-eslint/restrict-plus-operands': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
		'@typescript-eslint/sort-type-constituents': 'error',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/switch-exhaustiveness-check': 'error',
		'@typescript-eslint/triple-slash-reference': 'error',
		'@typescript-eslint/type-annotation-spacing': 'off',
		'@typescript-eslint/typedef': 'off',
		'@typescript-eslint/unbound-method': 'error',
		'@typescript-eslint/unified-signatures': 'off',
		'accessor-pairs': 'off',
		'array-callback-return': 'error',
		'block-scoped-var': 'error',
		'callback-return': 'off',
		'capitalized-comments': 'off',
		'class-methods-use-this': 'off',
		complexity: 'off',
		'consistent-return': 'off',
		'consistent-this': ['error', 'self'],
		'constructor-super': 'off',
		'default-case': 'off',
		'dot-notation': 'off',
		eqeqeq: ['error', 'smart'],
		'for-direction': 'off',
		'func-name-matching': ['warn', 'always'],
		'func-names': ['warn', 'as-needed'],
		'func-style': 'off',
		'global-require': 'off',
		'guard-for-in': 'warn',
		'handle-callback-err': 'off',
		'id-blacklist': 'off',
		'id-length': 'off',
		'id-match': 'off',
		'init-declarations': 'off',
		'line-comment-position': 'off',
		'lines-between-class-members': [
			'error',
			'always',
			{
				exceptAfterSingleLine: true
			}
		],
		'max-depth': 'off',
		'max-lines': 'off',
		'max-nested-callbacks': 'off',
		'max-params': 'off',
		'max-statements': 'off',
		'max-statements-per-line': [
			'error',
			{
				max: 1
			}
		],
		'multiline-comment-style': 'off',
		'new-cap': 'off',
		'no-alert': 'error',
		'no-array-constructor': 'off',
		'no-await-in-loop': 'off',
		'no-bitwise': 'off',
		'no-buffer-constructor': 'error',
		'no-caller': 'error',
		'no-case-declarations': 'error',
		'no-catch-shadow': 'error',
		'no-class-assign': 'warn',
		'no-compare-neg-zero': 'error',
		'no-cond-assign': 'warn',
		'no-console': 'off',
		'no-const-assign': 'error',
		'no-constant-condition': 'off',
		'no-control-regex': 'off',
		'no-debugger': 'error',
		'no-delete-var': 'error',
		'no-div-regex': 'off',
		'no-dupe-args': 'error',
		'no-dupe-class-members': 'off',
		'no-dupe-keys': 'error',
		'no-duplicate-case': 'error',
		'no-duplicate-imports': 'off',
		'no-else-return': 'warn',
		'no-empty': 'off',
		'no-empty-character-class': 'error',
		'no-empty-function': 'off',
		'no-empty-pattern': 'off',
		'no-eq-null': 'warn',
		'no-eval': 'warn',
		'no-ex-assign': 'off',
		'no-extend-native': 'warn',
		'no-extra-bind': 'off',
		'no-extra-boolean-cast': 'off',
		'no-extra-label': 'warn',
		'no-fallthrough': 'off',
		'no-func-assign': 'off',
		'no-global-assign': 'off',
		'no-implicit-coercion': 'error',
		'no-implicit-globals': 'off',
		'no-implied-eval': 'off',
		'no-import-assign': 'warn',
		'no-inline-comments': 'off',
		'no-inner-declarations': 'off',
		'no-invalid-regexp': 'warn',
		'no-invalid-this': 'off',
		'no-irregular-whitespace': [
			'error',
			{
				skipComments: true,
				skipRegExps: true,
				skipStrings: true,
				skipTemplates: true
			}
		],
		'no-iterator': 'off',
		'no-label-var': 'error',
		'no-labels': 'off',
		'no-lone-blocks': 'off',
		'no-lonely-if': 'error',
		'no-loop-func': 'off',
		'no-magic-numbers': 'off',
		'no-mixed-requires': 'error',
		'no-multi-assign': 'warn',
		'no-multi-str': 'error',
		'no-negated-condition': 'warn',
		'no-nested-ternary': 'off',
		'no-new': 'off',
		'no-new-func': 'warn',
		'no-new-object': 'error',
		'no-new-require': 'error',
		'no-new-symbol': 'warn',
		'no-new-wrappers': 'warn',
		'no-obj-calls': 'warn',
		'no-octal': 'error',
		'no-octal-escape': 'error',
		'no-param-reassign': 'off',
		'no-path-concat': 'warn',
		'no-plusplus': 'off',
		'no-process-env': 'off',
		'no-process-exit': 'off',
		'no-proto': 'off',
		'no-prototype-builtins': 'off',
		'no-redeclare': 'off',
		'no-regex-spaces': 'warn',
		'no-restricted-globals': 'off',
		'no-restricted-imports': 'off',
		'no-restricted-modules': 'off',
		'no-restricted-properties': 'off',
		'no-restricted-syntax': 'off',
		'no-return-assign': 'off',
		'no-return-await': 'warn',
		'no-script-url': 'off',
		'no-self-assign': 'error',
		'no-self-compare': 'warn',
		'no-setter-return': 'warn',
		'no-shadow': 'off',
		'no-shadow-restricted-names': 'error',
		'no-sparse-arrays': 'warn',
		'no-sync': 'off',
		'no-template-curly-in-string': 'error',
		'no-ternary': 'off',
		'no-this-before-super': 'error',
		'no-throw-literal': 'off',
		'no-undef': 'off',
		'no-undef-init': 'off',
		'no-undefined': 'off',
		'no-underscore-dangle': 'off',
		'no-unmodified-loop-condition': 'off',
		'no-unneeded-ternary': 'off',
		'no-unreachable': 'warn',
		'no-unsafe-finally': 'warn',
		'no-unsafe-negation': 'error',
		'no-unused-expressions': 'off',
		'no-unused-labels': 'error',
		'no-unused-vars': 'off',
		'no-use-before-define': 'off',
		'no-useless-call': 'off',
		'no-useless-computed-key': 'error',
		'no-useless-concat': 'warn',
		'no-useless-constructor': 'off',
		'no-useless-escape': 'off',
		'no-useless-rename': 'error',
		'no-useless-return': 'warn',
		'no-var': 'error',
		'no-void': 'off',
		'no-warning-comments': 'off',
		'no-with': 'error',
		'object-shorthand': ['error', 'always'],
		'one-var': ['error', 'never'],
		'operator-assignment': ['error', 'always'],
		'padding-line-between-statements': 'off',
		'prefer-const': [
			'error',
			{
				destructuring: 'all'
			}
		],
		'prefer-destructuring': [
			'error',
			{
				AssignmentExpression: {
					array: true,
					object: false
				},
				VariableDeclarator: {
					array: false,
					object: true
				}
			}
		],
		'prefer-numeric-literals': 'off',
		'prefer-promise-reject-errors': 'error',
		'prefer-rest-params': 'warn',
		'prefer-spread': 'error',
		'prefer-template': 'warn',
		radix: 'error',
		'require-await': 'off',
		'require-jsdoc': 'off',
		'require-yield': 'warn',
		'sort-imports': ['error', { ignoreDeclarationSort: true }],
		'sort-keys': 'off',
		'sort-vars': 'off',
		'spaced-comment': ['error', 'always'],
		strict: ['error', 'never'],
		'symbol-description': 'warn',
		'use-isnan': 'error',
		'valid-jsdoc': 'off',
		'valid-typeof': 'error',
		'vars-on-top': 'off',
		yoda: 'error',
		'prettier/prettier': [
			'error',
			{
				printWidth: 150
			}
		],
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		'import/no-duplicates': 'error',
		'import/no-unresolved': 'error',
		'import/no-named-as-default': 'off',
		'import/order': [
			'error',
			{
				groups: [
					'index', //
					'sibling',
					'parent',
					'internal',
					'external',
					'builtin',
					'object',
					'type'
				]
			}
		],
		'tsdoc/syntax': 'warn'
	}
};
