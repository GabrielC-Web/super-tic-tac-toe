
/**
 * Revisa si hay match en filas, columnas o diagonales
 * @param {*} arr
 * @param {*} position
 * @returns
 */
export default function hasMatch(arr, position) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];

        if (element != "") {
            //* Para ver si hay 3 seguidos en fila 1
            if (arr[0] != "" && arr[0] == arr[1] && arr[0] == arr[2]) {
                return {
                    win: true,
                    playerMove: arr[0],
                    position: position,
                };
                //* Para ver si hay 3 seguidos en fila 2
            } else if (
                arr[3] != "" &&
                arr[3] == arr[4] &&
                arr[3] == arr[5]
            ) {
                return {
                    win: true,
                    playerMove: arr[3],
                    position: position,
                };
                //* Para ver si hay 3 seguidos en fila 3
            } else if (
                arr[6] != "" &&
                arr[6] == arr[7] &&
                arr[6] == arr[8]
            ) {
                return {
                    win: true,
                    playerMove: arr[6],
                    position: position,
                };
                //* Para ver si hay 3 seguidos en columna
            } else if (element == arr[i + 3] && element == arr[i + 6]) {
                return {
                    win: true,
                    playerMove: element,
                    position: position,
                };
                //* Para ver si hay 3 seguidos en diagonal
            } else if (
                arr[0] != "" &&
                arr[0] == arr[4] &&
                arr[0] == arr[8]
            ) {
                return {
                    win: true,
                    playerMove: arr[0],
                    position: position,
                };
                //* Para ver si hay 3 seguidos en diagonal inverso
            } else if (
                arr[2] != "" &&
                arr[2] == arr[4] &&
                arr[2] == arr[6]
            ) {
                return {
                    win: true,
                    playerMove: arr[2],
                    position: position,
                };
            }
        }
    }
    return { win: false, position: position };
}