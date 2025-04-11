# ───────────────────────────────────────────────────────────────
# Stage 1: Build environment with Rust and full dependencies
# ───────────────────────────────────────────────────────────────
FROM python:3.11-slim AS builder

# Install build tools and Rust (minimal profile to avoid bloat)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && curl https://sh.rustup.rs -sSf | sh -s -- -y --profile minimal \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set Rust PATH
ENV PATH="/root/.cargo/bin:$PATH"

# Create and set working directory
WORKDIR /app

# Copy only requirements first for caching
COPY requirements.txt .

# Install Python dependencies (including Rust-built ones)
RUN /bin/bash -c ". $HOME/.cargo/env && pip install --upgrade pip && pip install --prefix=/install -r requirements.txt"

# Copy application code (optional in this stage if dependencies are enough)
COPY . .

# ───────────────────────────────────────────────────────────────
# Stage 2: Final image — clean and minimal
# ───────────────────────────────────────────────────────────────
FROM python:3.11-slim

# Copy installed Python packages from builder
COPY --from=builder /install /usr/local

# Set working directory
WORKDIR /app

# Copy the app source code
COPY ./FastAPI .

# Expose the port (adjust if needed)
EXPOSE 8000

# Run the app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]