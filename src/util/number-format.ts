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

/**
 * @returns 예시) 1.0k처럼 1000의 단위를 k로 분리
 */
export const kFormat = (n: number | null | undefined): string => {
  if (n == null || n == undefined) {
    return "0";
  }
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();
};

export const formatDuration = (sec: number | null) => {
  if (!sec) return "-";
  return (sec / 60).toFixed(1);
};
