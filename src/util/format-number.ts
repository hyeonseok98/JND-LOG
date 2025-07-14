/**
 * 주어진 값을 숫자로 변환합니다.
 * 변환 불가능한 경우 null을 반환
 */
export const toNumber = (v: unknown) => {
  const n = Number(v);
  return isNaN(n) ? null : n;
};

/**
 * 숫자를 지정된 소수점 자리까지 포맷팅
 * 값이 null 또는 undefined면 "-"를 반환
 */
export const formatNumber = (v: number | null | undefined, d = 0) =>
  v === null || v === undefined ? "-" : v.toFixed(d);

export const formatDuration = (sec: number | null) => {
  if (!sec) return "-";
  return (sec / 60).toFixed(1);
};
