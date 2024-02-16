document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
    const text = document.querySelector('textarea').value;
    const rows = text.split('\n');

    for (const [i, row] of rows.entries()) {
        const [first, second] = row.toLowerCase().trim().split('_');
        // console.log(first, row, second);
        const output = `${first}${second ? second.replace(
            second[0],
            second[0].toLowerCase()
        ): ''}`;
        console.log(`${output.padEnd(20)} ${'emoji'.repeat(i + 1)}`);
    }
});
