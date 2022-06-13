export default function formatDate(rawDate: string, type: string): string {
  const date: Date = new Date(rawDate);
  let short_options = { month: 'long', year: 'numeric' };
  let return_value:  string = '';
  let long_options = { weekday: 'long' , day: 'numeric', month: 'long', year: 'numeric'}

  if (type === 'short') {
    return_value = date.toLocaleDateString('en-US', short_options);
  } else {
    return_value = date.toLocaleDateString('en-US', long_options);
  }

  return return_value;
}
