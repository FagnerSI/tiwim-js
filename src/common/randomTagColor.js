export default () => {
    const colors = [
        "magenta",
        "red",
        "volcano",
        "orange",
        "gold",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "purple",
    ]
    return colors[Math.floor(Math.random() * 10)];
}

