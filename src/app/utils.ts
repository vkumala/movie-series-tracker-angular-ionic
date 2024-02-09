export default class Utils {
    static getImageLink(width: number, path: string) {
        return "https://image.tmdb.org/t/p/w" + width + "/" + path
    }
}