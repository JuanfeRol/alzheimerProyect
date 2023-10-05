package utils

import (
	"strings"
)

func CleanString(cleaning string, atAll bool) string {
	if atAll {
		cleaning = strings.ReplaceAll(cleaning, " ", "")
	}

	cleaning = strings.ReplaceAll(cleaning, "\n", "")
	cleaning = strings.ReplaceAll(cleaning, "\t", "")
	cleaning = strings.ReplaceAll(cleaning, "\r", "")
	cleaning = strings.ReplaceAll(cleaning, "\v", "")
	cleaning = strings.ReplaceAll(cleaning, "\f", "")
	cleaning = strings.ReplaceAll(cleaning, "\b", "")
	cleaning = strings.ReplaceAll(cleaning, "\a", "")
	cleaning = strings.ReplaceAll(cleaning, "\\", "")
	cleaning = strings.ReplaceAll(cleaning, "\"", "")
	cleaning = strings.ReplaceAll(cleaning, "'", "")
	cleaning = strings.ReplaceAll(cleaning, "(", "")
	cleaning = strings.ReplaceAll(cleaning, ")", "")
	cleaning = strings.ReplaceAll(cleaning, "[", "")
	cleaning = strings.ReplaceAll(cleaning, "]", "")
	cleaning = strings.ReplaceAll(cleaning, "{", "")
	cleaning = strings.ReplaceAll(cleaning, "}", "")
	cleaning = strings.ReplaceAll(cleaning, "<", "")
	cleaning = strings.ReplaceAll(cleaning, ">", "")
	return cleaning
}
