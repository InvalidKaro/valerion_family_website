/**
 * Sets the document title to the specified value.
 *
 * @param {object} props - The properties object containing the title.
 * @return {null} The function does not return anything.
 */
export default function DocTitle(props) {
    const { title } = props;
    document.title = title;
    return null;
}