export default function (atrr, array = []) {
    return array.map(item => String(item[atrr] || item))
}