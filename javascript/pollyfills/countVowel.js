function countVowel(str) {
    let count = 0;
    const map = { a: 1, e: 1, i: 1, o: 1, u: 1 };
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (map[char]) {
            count += 1;
        }
    }
    return count;
}

console.log(countVowel("amit agrawal"));        // return 5