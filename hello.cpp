#include <iostream>

using namespace std;

class Stack{
    
        int* arr;
        int top;
        int size;
     
         Stack(int size1){
            arr = new int[size1];
            size = size1;
            top = -1;
         }

         public:
        //  Push Function
         void push(int element){
            if(size - top >1){
                top++;
                arr[top] = element;
            }else{
                cout<<"Stack Overflow"<<endl;
            }
         }

        //  Pop Function
        void pop(){
            if(top == -1){
                cout<<"Stack Underflow!"<<endl;
            }else{
                top--;
            }
        }

        // getTop function
        int getTop(){
            if(top != -1){
                return arr[top];
            }else{
                cout<<"Stack Empty.";
            }
        }
};

int main(){
    cout<<"Hello, World!";
    return 0;
}