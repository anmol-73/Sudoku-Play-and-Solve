
export const getCellBorderColor = (version) => 
{
    let borderColor;
    if (version === 'black') 
    {
        borderColor = '#555555';
    } 
    else if (version === 'blue') 
    {
        borderColor = '#67A5E2';
    } 
    else if (version === 'red') 
    {
        borderColor = '#FF0000';
    } 
    else if (version === 'green') 
    {
        borderColor = '#5AA47C';
    }
    
    return borderColor;
}

  