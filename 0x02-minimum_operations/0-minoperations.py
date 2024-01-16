#!/usr/bin/python3
"""This module returns minimum operations"""


def minOperations(n):
    """Returns minimum operations to result in n characters in a text file"""
    total_ops = []
    step = 2
    while step * step <= n:
        while n % step == 0:
            n /= step
            total_ops.append(int(step))
        step += 1
    if n > 1:
        total_ops.append(int(n))
    return sum(total_ops)
