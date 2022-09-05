import { renderHook } from '@testing-library/react-hooks';

import { useId } from './useId';

describe('useId check', () => {
	it('Id check', () => {
		const { result } = renderHook(useId);
		expect(result.current).toMatch(/^[0-9a-f]{13}$/);
	});
	it('Generate unique id', () => {
		const { result: result1 } = renderHook(useId);
		const { result: result2 } = renderHook(useId);
		expect(result1.current).not.toBe(result2.current);
	});
});
