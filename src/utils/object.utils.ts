/**
 * 객체가 비어있는지 확인하는 유틸 함수
 *
 * @param obj - 확인할 객체
 * @param options - 추가 옵션
 * @returns 객체가 비어있으면 true, 아니면 false
 */
export function isEmptyObject(
  obj: any,
  options: {
    /**
     * null/undefined를 비어있음으로 간주할지 여부
     * @default true
     */
    considerNullAsEmpty?: boolean;

    /**
     * 빈 문자열을 비어있음으로 간주할지 여부
     * @default false
     */
    considerEmptyStringAsEmpty?: boolean;

    /**
     * 빈 배열을 비어있음으로 간주할지 여부
     * @default false
     */
    considerEmptyArrayAsEmpty?: boolean;
  } = {},
): boolean {
  const {
    considerNullAsEmpty = true,
    considerEmptyStringAsEmpty = true,
    considerEmptyArrayAsEmpty = true,
  } = options;
  // null/undefined 체크
  if (obj === null || obj === undefined) {
    return considerNullAsEmpty;
  }

  // 문자열 체크
  if (typeof obj === 'string') {
    return considerEmptyStringAsEmpty || obj.trim() === '';
  }

  // 배열 체크
  if (Array.isArray(obj)) {
    return considerEmptyArrayAsEmpty && obj.length === 0;
  }

  // 객체 체크
  if (typeof obj === 'object') {
    // 객체의 모든 키가 비어있는지 확인
    return Object.keys(obj).length === 0;
  }

  // 그 외의 타입은 비어있지 않음으로 간주
  return false;
}

/**
 * 객체가 비어있지 않은지 확인하는 유틸 함수
 *
 * @param obj - 확인할 객체
 * @param options - 추가 옵션
 * @returns 객체가 비어있지 않으면 true, 아니면 false
 */
export function isNotEmptyObject(
  obj: any,
  options?: Parameters<typeof isEmptyObject>[1],
): boolean {
  return !isEmptyObject(obj, options);
}
