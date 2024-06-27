/**
 * String Null 체크
 * @param val 체크 Value
 * @returns {boolean} Empty 여부
 */
const isEmpty = val => {
	if (val == null) {
		return true;
	}

	const chkStr = String(val);

	if (chkStr == null) {
		return true;
	}

	if (chkStr.valueOf() === 'undefined') {
		return false;
	}

	return chkStr.toString().length === 0;
};

/**
 * 문자열의 좌측부터 지정한 길이만큼 가져오는 함수
 * @param sOrg 원본 문자열
 * @param nSize 얻어올 크기. [Default Value = 0]
 * @returns {string} 문자열
 */
const left = (sOrg, nSize) => {
	return String(sOrg).substr(0, nSize);
};

/**
 * 문자열의 우측부터 지정한 길이만큼 가져오는 함수
 * @param sOrg 원본 문자열
 * @param nSize 얻어올 크기. [Default Value = 0]
 * @returns {string} 문자열
 */
const right = (sOrg, nSize) => {
	if (isEmpty(sOrg) || isEmpty(nSize)) return '';

	if (sOrg.length < nSize) {
		return sOrg;
	} else {
		return sOrg.substr(sOrg.length - nSize, nSize);
	}
};

/**
 * 왼쪽 문자 채우기
 * @param val 문자열
 * @param pad 채울 문자열(default : " "(공백) )
 * @param len 전체 문자 길이(default : 1 )
 * @returns {String} 문자열
 */
const lpad = (val, pad, len) => {
	let sRet = '';
	let strVal = '';

	if (isEmpty(val)) return '';
	if (isEmpty(pad)) pad = ' ';
	if (isEmpty(len)) len = 1;

	strVal = String(val);

	if (strVal.length >= len) return strVal;

	for (let valIdx = 0; valIdx < len - strVal.length; valIdx++) {
		sRet += pad;
	}

	sRet += strVal;

	return sRet;
};

/**
 * 오른쪽 문자 채우기
 * @param val 문자열
 * @param pad 채울 문자열(default : " "(공백) )
 * @param len 전체 문자 길이(default : 1 )
 * @returns {String} 문자열
 */
const rpad = (val, pad, len) => {
	let sRet = '';
	const strVal = val;

	if (isEmpty(val)) return '';
	if (isEmpty(pad)) pad = ' ';
	if (isEmpty(len)) len = 1;

	if (strVal.length >= len) return val;

	sRet = String(val);

	for (let valIdx = 0; valIdx < len - strVal.length; valIdx++) {
		sRet += pad;
	}

	return sRet;
};

/**
 * 문자열 byte 길이를 조회
 * @param val 문자열
 * @returns {number} 문자열 byte 길이
 */
const lengthByte = val => {
	let byteLength = 0;
	let chr;

	if (isEmpty(val)) return 0;

	for (let valIdx = 0; valIdx < val.length; valIdx++) {
		chr = escape(val.charAt(valIdx));

		if (chr.length === 1) {
			byteLength++;
		} else if (chr.includes('%u')) {
			byteLength += 3;
		} else if (chr.includes('%')) {
			byteLength += chr.length / 3;
		}
	}

	return byteLength;
};

/**
 * 입력받은 Number에 컴마를 추가한다.
 * @param nNumber 숫자
 * @param nDetail 반올림할 소숫점 이하의 자릿수.
 * @returns {string} Comma 가 포함하고 있는 숫자
 */
const appendComma = (nNumber, nDetail) => {
	if (nNumber == null) return '';
	if (nDetail == null) nDetail = 0;

	nNumber = parseFloat(nNumber);

	let strNumber = String(nNumber);
	strNumber =
		nNumber < 0 ? strNumber.replaceAll(strNumber, '-', '') : strNumber;
	const arrNumber = strNumber.split('.');
	let strFormatNum = '';
	let j = 0;

	for (let i = arrNumber[0].length - 1; i >= 0; i--) {
		if (i !== strNumber.length && j === 3) {
			strFormatNum = arrNumber[0].charAt(i) + ',' + strFormatNum;
			j = 0;
		} else {
			strFormatNum = arrNumber[0].charAt(i) + strFormatNum;
		}
		j++;
	}

	if (arrNumber.length > 1) {
		strFormatNum = strFormatNum + '.' + arrNumber[1];
	}

	strFormatNum = nNumber < 0 ? '-' + strFormatNum : strFormatNum;

	return strFormatNum;
};

/**
 * 컴마를 제거한다.
 * @param strValue 컴마가 포함된 스트링
 * @returns {String} 컴마가 제거된 스트링이 반환된다.
 */
const removeComma = strValue => {
	return strValue.replaceAll(',', '');
};

const formatSize = (val) => {
	const type = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const size = Math.floor(Math.log(val) / Math.log(1024));
	let decimalPlaces = 2;

	if(type[size] === 'bytes') {
		decimalPlaces = 0;
	}

	return (val / Math.pow(1024, size)).toFixed(decimalPlaces) + " " + type[size];
};

const stringToDateFormat = (val) => {

	if(val.length === 8){
		return `${val.substr(0,4)}-${val.substr(4,2)}-${val.substr(6,2)}`;
	}
	return val;

}

const repalceBr =(val) => {
	return val.replace(/(?:\r\n|\r|\n)/g, '<br />');
}



export default {
	isEmpty,
	left,
	right,
	lpad,
	rpad,
	lengthByte,
	appendComma,
	removeComma,
	formatSize,
	stringToDateFormat,
	repalceBr


};
