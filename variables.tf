variable "aws_region" {
  type    = string
  default = "eu-west-3"
}

variable "project" {
  type    = string
  default = "tp5-cloudsec"
}

variable "name_suffix" {
  type        = string
  description = "Suffixe unique pour distinguer les ressources (ex: groupe5)"
}

variable "db_host" {
  type    = string
  default = "db.example.local"
}

variable "api_token_dummy" {
  type        = string
  description = "Valeur de démonstration uniquement. Ne jamais mettre un vrai secret dans le code ou dans tfvars."
  sensitive   = true
}

variable "log_retention_days" {
  type    = number
  default = 7
}
