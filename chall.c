#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    char *pw = calloc(9, sizeof(char));
    if(pw == NULL){
        goto err;
    }

    pw[0] = 'a';
    for(int i = 1; i <= 8; i++){
        pw[i] = pw[i - 1] + 1;
    }

    pw[9] = '\0';
    char *in = malloc(10);
    printf("password: \t");
    fgets(in, 10, stdin);

    if(strcmp(in, pw) == 0){
        puts("correct");
    } else {
        puts("wrong");
    }

err:
    return 0;
}
