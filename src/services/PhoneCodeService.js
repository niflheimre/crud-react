import CodeObj from "./../collection/phoneCode.json";

export const getPhoneCodeCollection = () => (
    Object.entries(CodeObj).map(([key, value]) => ({ key, value }))
)

