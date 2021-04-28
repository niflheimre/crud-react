import nat from './../collections/nationalities.json'


export const getNationCollection = () => (
    nat.reduce((obj, cur, i) => [...obj, { key: cur, value: cur }], []
)
)