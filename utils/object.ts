
export const keys = <T extends {}>(o: T): Array<keyof T> => Object.keys(o) as Array<keyof T>

export default {}
