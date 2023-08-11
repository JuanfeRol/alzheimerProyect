package utils

import (
	"os"
	"strings"
)

func LoadEnvFromFile(filename string) {
	lines, err := os.ReadFile(filename)
	if err != nil {
		panic("Error reading .env file")
	}

	for _, line := range strings.Split(string(lines), "\n") {
		parts := strings.SplitN(line, "=", 2)
		if len(parts) == 2 {
			key := strings.TrimSpace(parts[0])
			value := strings.TrimSpace(parts[1])
			os.Setenv(key, value)
		}
	}
}
