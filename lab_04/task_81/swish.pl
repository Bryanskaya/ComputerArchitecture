ok.

input(A, B) :- read(A), read(B);
    		   ok.

process_arr(A, B) :- is_fib(0, 1, 0, A),
    TEMP is (A + 1), 
    TEMP =< B, process_arr(TEMP, B);
    ok.

is_fib(X, Y, N, NUM) :- N < NUM, N1 is X + Y, X1 is Y, Y1 is N1, is_fib(X1, Y1, N1, NUM);
	N is NUM, write(NUM), nl;
ok.
						

f :- input(A, B), process_arr(A, B);
     ok.