%ladda in ljud
%[noc, fs] = wavread('BuzzE1.wav');
[y, fs] = wavread('nocturne.wav'); %10 sec l�ng

soundsc(y,fs)

%best�m l�ngd
N = length(y);

%best�m antar delar % 12 ggr /sec = lagom men visa inte lika ofta?
delar = 120;
del = N/delar;
f = 0:fs/del:fs/2;
M = length(f);

for i = 1:delar
    y1 = y((i-1)*6*del + 1:i*6*del); %ljudet fr�n i:e delen
    Y1 = fft(y1);
    plot(f,abs(Y1(1:M)));
    figure
end