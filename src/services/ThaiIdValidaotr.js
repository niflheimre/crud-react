export default function ThaiIdValidator(id) {
  
  if (!(/^\d{13}$/.test(id))) return false;

    var sum = 0;
    
  for (var i = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i)) * (13 - i);
  }

  if ((11 - (sum % 11)) % 10 !== parseInt(id.charAt(12))) {
    return false;
  }

  return true;
}
