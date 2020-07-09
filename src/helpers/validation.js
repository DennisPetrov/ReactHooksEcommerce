export function validate(val, pattern) {
    var value= val.trim();
    var result={
        valid:true,
        message:""
    }
    if(!value){
        result.valid=false;
        result.message = "Field should not be empty";
    }else if (pattern) {
        if (typeof pattern === "function") {
            if (!pattern(value)) {
                result.message = "Field value is incorrect";
                result.valid = false;
            }
        } else {
            if (!pattern.test(value)) {
                result.message = "Field value is incorrect";
                result.valid = false;
            }
        }
    }
    return result;
}