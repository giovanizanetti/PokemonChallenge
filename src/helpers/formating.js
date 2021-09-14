export const getTypes = (types) =>
  types.map((type, i) => (i !== types.length - 1 ? type.type.name + ', ' : type.type.name))
